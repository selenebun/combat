// Apply properties from a template to an object
function applyTemplate(obj, template) {
    if (typeof template === 'undefined') return;

    let keys = Object.keys(template);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        obj[key] = template[key];
    }
}
