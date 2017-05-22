export function* idGenerator(initialValue) {
    let id = initialValue || 0;
    while (true) {
        yield id++;
    }
}