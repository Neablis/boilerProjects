import 'whatwg-fetch';

export const TEST_ON = 'TEXT_ON';
export const TEST_OFF = 'TEST_OFF';

export function testOn(dispatch) {
  return {
    type: TEST_ON
  };
};

export function testOff(dispatch) {
  return {
    type: TEST_OFF
  };
};
