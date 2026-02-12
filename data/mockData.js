
// Using real IDs for testing embeds
export const youtubeData = [
    {
        id: 'yt-1',
        type: 'youtube',
        title: 'YouTube Video 1',
        // Example: Valid YouTube Video URL
        url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
        thumbnail: 'https://placehold.jp/320x180.png?text=YouTube'
    },
    {
        id: 'yt-2',
        type: 'youtube',
        title: 'YouTube Video 2',
        url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
        thumbnail: 'https://placehold.jp/320x180.png?text=YouTube'
    }
];

export const noteData = [
    {
        id: 'note-1',
        type: 'note',
        title: 'Note Article 1',
        // Example: Valid Note Article URL
        // https://note.com/info/n/n276abd5a30ae (Note official info)
        url: 'https://note.com/info/n/n276abd5a30ae',
        thumbnail: 'https://placehold.jp/320x180.png?text=Note'
    },
    {
        id: 'note-2',
        type: 'note',
        title: 'Note Article 2',
        url: 'https://note.com/info/n/n87b7a1e05094',
        thumbnail: 'https://placehold.jp/320x180.png?text=Note'
    }
];

export const activities = [...youtubeData, ...noteData];
