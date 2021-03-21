const generateSelector = (template: any) => {
  let selector = `${template.selector}`;
  if (template.texts && template.texts.length > 0) {
    selector = generateTextContainSelector(template);
  }
  return selector;
};

const generateTextContainSelector = (template: any) => {
  return template.texts
    .map(
      (t: string) =>
        `${template.selector}:contains('${t}') ${
          template.inject ? template.inject : ""
        }`
    )
    .join(",");
};

export { generateSelector };
