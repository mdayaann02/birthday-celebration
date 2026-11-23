// api/fetch-playlist.js - YouTube Playlist & Track Metadata Scraper
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const rawUrl = req.query?.url || '';
  if (!rawUrl || typeof rawUrl !== 'string') {
    return res.status(400).json({ success: false, error: 'Missing url parameter' });
  }

  const cleanUrl = rawUrl.trim();
  let playlistId = null;
  let videoId = null;

  const listMatch = cleanUrl.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  if (listMatch) {
    playlistId = listMatch[1];
  } else if (/^(PL|RD|FL|UU|LL)[a-zA-Z0-9_-]+$/.test(cleanUrl)) {
    playlistId = cleanUrl;
  }

  const vMatch = cleanUrl.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  if (vMatch) {
    videoId = vMatch[1];
  }

  // 1. If playlistId is present, scrape YouTube playlist HTML
  if (playlistId) {
    try {
      const response = await fetch(`https://www.youtube.com/playlist?list=${playlistId}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      });

      if (response.ok) {
        const html = await response.text();
        const match = html.match(/var ytInitialData\s*=\s*({.+?});<\/script>/s) || html.match(/ytInitialData\s*=\s*({.+?});/);
        if (match) {
          const data = JSON.parse(match[1]);
          const playlistTitle = data.metadata?.playlistMetadataRenderer?.title ||
                                data.header?.playlistHeaderRenderer?.title?.simpleText ||
                                data.microformat?.microformatDataRenderer?.title ||
                                'Romantic YouTube Playlist';
          const tracks = [];

          function walk(node) {
            if (!node || typeof node !== 'object') return;
            // Modern Web YouTube format
            if (node.lockupViewModel && node.lockupViewModel.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO') {
              const vm = node.lockupViewModel;
              const meta = vm.metadata?.lockupMetadataViewModel;
              const title = meta?.title?.content || vm.rendererContext?.accessibilityContext?.label || 'YouTube Track';
              const artist = meta?.metadata?.contentMetadataViewModel?.metadataRows?.[0]?.metadataParts?.[0]?.text?.content || 'YouTube Artist';
              const vId = vm.contentId;
              if (vId && !tracks.some(t => t.videoId === vId)) {
                tracks.push({
                  id: tracks.length + 1,
                  title: title.replace(/[\(\[](Official|Music Video|Video|Lyrics|Audio|HD|4K|Visualizer|Lyric Video)[\)\]]/gi, '').trim(),
                  artist,
                  src: `https://www.youtube.com/watch?v=${vId}`,
                  videoId: vId,
                  tag: `TRACK ${String(tracks.length + 1).padStart(2, '0')} 🌸`,
                  duration: '3:30'
                });
              }
            }
            // Classic YouTube playlist format
            else if (node.playlistVideoRenderer) {
              const p = node.playlistVideoRenderer;
              const title = p.title?.runs?.map(r => r.text).join('') || p.title?.simpleText || 'YouTube Track';
              const artist = p.shortBylineText?.runs?.map(r => r.text).join('') || 'YouTube Artist';
              const vId = p.videoId;
              if (vId && !tracks.some(t => t.videoId === vId)) {
                tracks.push({
                  id: tracks.length + 1,
                  title: title.replace(/[\(\[](Official|Music Video|Video|Lyrics|Audio|HD|4K|Visualizer|Lyric Video)[\)\]]/gi, '').trim(),
                  artist,
                  src: `https://www.youtube.com/watch?v=${vId}`,
                  videoId: vId,
                  tag: `TRACK ${String(tracks.length + 1).padStart(2, '0')} 🌸`,
                  duration: p.lengthText?.simpleText || '3:30'
                });
              }
            }
            for (const k of Object.keys(node)) {
              walk(node[k]);
            }
          }

          walk(data);

          if (tracks.length > 0) {
            return res.status(200).json({
              success: true,
              playlistTitle,
              tracks: tracks.slice(0, 50)
            });
          }
        }
      }
    } catch (err) {
      console.warn('Playlist scrape error:', err.message);
    }
  }

  // 2. Fallback to single video oEmbed
  if (videoId || cleanUrl) {
    try {
      const targetUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : cleanUrl;
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(targetUrl)}&format=json`);
      if (oembedRes.ok) {
        const oeData = await oembedRes.json();
        const title = (oeData.title || 'YouTube Song').replace(/[\(\[](Official|Music Video|Video|Lyrics|Audio|HD|4K|Visualizer|Lyric Video)[\)\]]/gi, '').trim();
        return res.status(200).json({
          success: true,
          playlistTitle: title,
          tracks: [
            {
              id: 1,
              title,
              artist: oeData.author_name || 'YouTube Artist',
              src: targetUrl,
              videoId: videoId || '',
              tag: 'OUR THEME 🌸',
              duration: '3:45'
            }
          ]
        });
      }
    } catch (err) {
      console.warn('oEmbed fetch error:', err.message);
    }
  }

  return res.status(404).json({
    success: false,
    error: 'Could not fetch YouTube songs from the provided URL'
  });
}
