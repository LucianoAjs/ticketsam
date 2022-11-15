export function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export function mergeAndGetUnique(
  arrayA: Array<string>,
  arrayB: Array<string>,
) {
  const hash = {};
  let x: number;

  for (x = 0; x < arrayA.length; x++) {
    hash[arrayA[x]] = true;
  }
  for (x = 0; x < arrayB.length; x++) {
    hash[arrayB[x]] = true;
  }
  return Object.keys(hash);
}
