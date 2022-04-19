const initialState = {
    users: [
        {
            firstname: "Default",
            lastname: "User",
            phoneNumber: "5555555555",
            profileImg: "",
            credentials: {
                username: "DEFAULT-USER",
                email: "default-user@gmail.com",
                password: "asdkfjadlskjsdhfkjsfhakjsh"
            },
            type: "USER_CONSUMER",
            following: [],
            comments: [],
            reviews: [],
        }
    ],
    comments: [],
}

export default initialState;

// {
//     _id: "2309483",
//         episodeId: "123",
//     userId: "456",
//     body: "test comment",
//     datePosted: "",
//     likes: {
//     count: 0,
//         likedBy: []
// },
//     dislikes: 0
// }