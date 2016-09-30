module.exports = function(value) {
    if (!value) {
        return '0';
    }
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};