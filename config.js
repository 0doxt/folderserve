let get_folder = () => {
    if (process.argv.length < 3) {
        return false;
    } else {
        return process.argv[2].endsWith("/") ? process.argv[2].slice(0, -1) : process.argv[2];
    }
}

module.exports = {
    'port': 8080,
    'folder': get_folder()
};