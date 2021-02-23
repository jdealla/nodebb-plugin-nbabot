const getCurrentDate = () => {
    const dt = new Date();
    dt.setTime(dt.getTime()+dt.getTimezoneOffset()*60*1000);
    const offset = -300;
    const estDate = new Date(dt.getTime() + offset*60*1000);
    let month = estDate.getMonth() + 1;
    month = month.toString();
    return `${estDate.getFullYear()}${month.length < 2 ? "0" + month : month}${estDate.getDate()}`;
};

const formatDate = str => str.substr(4,2) + "/" + str.substr(6,2) + "/" + str.substr(0,4);

module.exports = { getCurrentDate, formatDate };