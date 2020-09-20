const random = Math.floor(Math.random() * 1000);

export const profileSchema = {
    firstname: 'Unknown',
    lastname: 'Unknown',
    username: `NN_User${random}`,
    skills: 'N/A',
    status: 'N/A',
    occupation: 'N/A',
    avatar: '',
    bio: 'N/A'
};