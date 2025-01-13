const users = [];

function addUser(id, username, room, color){

    const user = {id, username, room, color};
    users.push(user)
    return user;

}

function getRandomColor(){

    const colors = [
        '#FADADD', // Baby Pink
        '#B0E0E6', // Powder Blue
        '#E6E6FA', // Lavender
        '#98FF98', // Mint Green
        '#FFDAB9', // Peach
        '#87CEEB', // Sky Blue
        '#FFFACD', // Lemon Chiffon
        '#F88379', // Coral Pink
        '#C8A2C8', // Lilac
        '#CCCCFF', // Periwinkle
        '#9FE2BF', // Seafoam Green
        '#FFFFE0', // Soft Yellow
        '#FFC0CB', // Blush
        '#D6CADD', // Pale Lavender
        '#AEC6CF', // Robin's Egg Blue
        '#FFFDD0', // Cream
        '#FFB7C5', // Bubblegum Pink
        '#FFE5B4', // Light Peach
        '#A7C7E7', // Soft Teal
        '#FFD1B3'  // Pastel Orange
    ];
    

    const color = colors[Math.floor(Math.random * colors.length)];
    return color;
}

function doesUserExist(id){

    if(users.find(user => user.id === id)){
        return true
    };

}

module.exports = {
    addUser,
    getRandomColor,
    doesUserExist
}