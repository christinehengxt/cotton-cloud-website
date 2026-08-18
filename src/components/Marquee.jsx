const WORDS = [
  'Move Softly',
  'Feel Beautiful',
  'Yoga & Movement',
  'Cotton Cloud',
  'Soft Fabrics',
  'Mindful Living',
];

function marqueeItems(setKey) {
  return WORDS.flatMap((word) => [
    <span key={`${setKey}-${word}`}>{word}</span>,
    <span key={`${setKey}-${word}-dot`} className="dot">✦</span>,
  ]);
}

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee">
        {marqueeItems('a')}
        {marqueeItems('b')}
      </div>
    </div>
  );
}
