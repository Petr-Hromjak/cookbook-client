function shortenText(inputString, maxLength) {
  if (inputString.length <= maxLength) {
    return inputString;
  }

  let result;
  const lastSpaceIndex = inputString.lastIndexOf(' ', maxLength);
  if (lastSpaceIndex !== -1) {
    result = inputString.substring(0, lastSpaceIndex);
  } else {
    result = inputString.substring(0, maxLength);
  }

  const lastChar = result.at(result.length - 1);
  if (lastChar === '.' || lastChar === ',') {
    result = result.substring(0, result.length - 1)
  }

  return result + " ..."
}

export { shortenText };
