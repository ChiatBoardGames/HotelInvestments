
export default function() {
  const backgrounds = {
    undefined: 'grey',
    null: 'grey',
    '-2': 'lightgrey',
    '-1': 'black',
    0: 'yellow',
    1: 'red',
    2: 'blue',
    3: 'green',
    4: 'purple',
    5: 'orange',
    6: 'pink',
  };
  return function getStyle(chain) {
    const color = backgrounds[chain];
    return {
      color: ['pink', 'yellow', 'lightgrey'].includes(color) ? 'black' : 'white',
      backgroundColor: color,
    };
  };
}
