const generateSelector = (template) => {
  let selector = `${template.selector}`;
  if (template.texts && template.texts.length > 0) {
    selector = generateTextContainSelector(template);
  }
  return selector;
};

const generateTextContainSelector = (template) => {
  return template.texts
    .map(
      (t) =>
        `${template.selector}:contains('${t}') ${
          template.inject ? template.inject : ""
        }`
    )
    .join(",");
};

export { generateSelector };
