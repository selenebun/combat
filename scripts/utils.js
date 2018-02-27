// Apply properties from a template to an object
function applyTemplate(obj, template) {
    template = typeof template === 'undefined' ? {} : template;

    let keys = Object.keys(template);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        obj[key] = template[key];
    }
}
