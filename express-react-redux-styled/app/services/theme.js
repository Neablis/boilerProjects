
import colorableDominant from 'colorable-dominant';

const dominantColors = [
  '#7CE577',
  '#4C3B4D',
  '#C9EDDC',
  '#82968C',
  '#6A706E'
];

const palette = colorableDominant(dominantColors)
const defaults ={
  white: '#ffffff'
}
const theme = Object.assign(
  {}, 
  defaults,
  palette
);

export default theme;
