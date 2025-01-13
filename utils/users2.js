const users2 = [];

function getRandomColor2(){

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
    

    const color = colors[Math.floor(Math.random() * colors.length)];
    return color;
}

function addUser2(id){

    if(doesUserExist2(users2, id)){
        let color = users2.color;
        const user2 = {id, color};
        user2.push(user)
        return user2;
    }else { //if user doesnt exist yet
        let color = getRandomColor2();
        const user2 = {id, color};
        users2.push(user2)    
        return user2;

    }
}

function doesUserExist2(id){

    if(users2.find(user => user.id === id)){
        return true
    };

}

function getUsers2(){
    return users2;
}

module.exports = {
    addUser2,
    getRandomColor2,
    doesUserExist2,
    getUsers2
}