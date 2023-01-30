const getDateFromDB = (date) => {
    return date?.slice(0, 10);
}

const getTimeFromDB = (date) => {
    return date?.slice(11, 19);
}

const getDateAndTimeFromDB = (date) => {
    return getDateFromDB(date) + " " + getTimeFromDB(date);
}

const getFeedbackCategoryColor = (category) => {

    let categoryColor = "gray"

    if (category == "technical_support") {
        categoryColor = "orange";
    } else if (category == "billing_support") {
        categoryColor = "teal"
    } else if (category == "security_issue") {
        categoryColor = "red"
    } else if (category == "car_park_issue") {
        categoryColor = "lime"
    } else if (category == "defect_of_common_area") {
        categoryColor = "indigo"
    } else if (category == "suggestion") {
        categoryColor = "fuchsia"
    } else { categoryColor == "gray" }

    return categoryColor;

}

const getFeedbackCategoryLabel = (category) => {
    let categoryLabel = "";

    if (category == "technical_support") {
        categoryLabel = "Techinical Support";
    } else if (category == "billing_support") {
        categoryLabel = "Billing Support";
    } else if (category == "security_issue") {
        categoryLabel = "Security Issue";
    } else if (category == "car_park_issue") {
        categoryLabel = "Car Park Issue";
    } else if (category == "defect_of_common_area") {
        categoryLabel = "Defect of Common Area";
    } else if (category == "suggestion") {
        categoryLabel = "Suggestion";
    } else if (category == "others") { categoryLabel = "Others" }


    return categoryLabel;
}

const getFeedbackStatusColor = (status) => {

    let statusColor = "gray"
    return status == "replied" ? statusColor = "success" : statusColor = "danger"

}

const getTodayDate = () => {
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var date = new Date().getDate();
    return year + '-' + month + '-' + date;
}

const getCurrentTime = () => {
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    return hours + ':' + min + ':' + sec;
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export {
    getDateFromDB, getTimeFromDB, getDateAndTimeFromDB, getFeedbackCategoryColor, getFeedbackStatusColor,
    getFeedbackCategoryLabel, getTodayDate, getCurrentTime, capitalizeFirstLetter
};