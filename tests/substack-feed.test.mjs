import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parsePublicationFeed, PUBLICATION_FEEDS, normaliseUrl } from '../src/lib/substack-feed.ts';

function feed(items) { return `<rss xmlns:dc="http://purl.org/dc/elements/1.1/"><channel>${items}</channel></rss>`; }
function item({ author = 'Ines Burrell', link = 'https://www.persuasion.community/p/example?utm_source=feed', date = 'Fri, 16 Oct 2026 20:30:50 GMT', title = 'Example', description = 'A short introduction.' } = {}) {
 return `<item><title><![CDATA[${title}]]></title><description><![CDATA[${description}]]></description><dc:creator>${author}</dc:creator><link>${link}</link><pubDate>${date}</pubDate><enclosure url="https://substackcdn.com/example.jpg" /></item>`;
}
test('Persuasion imports only Ines, including coauthored articles', () => {
 const posts = parsePublicationFeed(feed(item() + item({author:'Other Writer'}) + item({author:'Ines Burrell and Other Writer'})), PUBLICATION_FEEDS[1]);
 assert.equal(posts.length, 2);
 assert.equal(posts[0].url, 'https://www.persuasion.community/p/example');
 assert.equal(posts[0].publication, 'Persuasion');
 assert.equal(posts[0].image, 'https://substackcdn.com/example.jpg');
});
test('invalid dates, off-site and unsafe links are rejected', () => {
 assert.deepEqual(parsePublicationFeed(feed(item({date:'invalid'}) + item({link:'javascript:alert(1)'}) + item({link:'https://other.example/p/example'})), PUBLICATION_FEEDS[1]), []);
 assert.equal(normaliseUrl('http://example.com'), '');
});
test('a single item is accepted, text is decoded and excerpt limited', () => {
 const [post] = parsePublicationFeed(feed(item({title:'A &amp; B&#8217;s',description:'<p>Hello &amp; goodbye.</p>' + ' More words'.repeat(40)})), PUBLICATION_FEEDS[1]);
 assert.equal(post.title, "A & B’s");
 assert.ok(post.excerpt.startsWith('Hello & goodbye.'));
 assert.ok(post.excerpt.length <= 200);
});
test('invalid RSS is an error, an empty RSS channel is valid', () => {
 assert.throws(() => parsePublicationFeed('<html>Unavailable</html>', PUBLICATION_FEEDS[0]));
 assert.throws(() => parsePublicationFeed('<rss><channel>', PUBLICATION_FEEDS[0]));
 assert.deepEqual(parsePublicationFeed('<rss><channel><title>Empty</title></channel></rss>', PUBLICATION_FEEDS[0]), []);
});
