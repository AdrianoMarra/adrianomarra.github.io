(function () {
    const apiUrl = 'http://jsonplaceholder.typicode.com/';

    const getUsers = function () {

        let usersElements = document.getElementById("users");

        fetch(apiUrl + "users/")
            .then((result) => {
                return result.json();
            })
            .then((users) => {
                users.forEach(user => {
                    let li = document.createElement("LI");
                    li.innerHTML = "Name : <span>" + user.name + " </span> <br /> Email: <span>" + user.email + "</span> <br /> <button user-id=" + user.id + "> Show posts </button> <ol class='posts_list' id=" + user.id + "></ol>";
                    usersElements.appendChild(li);
                });
            })
            .then(() => {
                let btns = document.getElementsByTagName("button");
                listenButtonsClickEvents(btns);
            })
            .catch((err) => {
                console.log("Error: " + err);
            });
    }

    const listenButtonsClickEvents = function (btns) {

        for (let index = 0; index < btns.length; index++) {
            const element = btns[index];
            element.onclick = (e) => {
                const userId = e.target.getAttribute("user-id");
                let postsList = document.getElementById(userId);
                postsList.classList.toggle('active');
                if (postsList.classList.contains('active')) {
                    element.innerHTML = "Hide posts"
                } else {
                    element.innerHTML = "Show posts"
                }
                if (!postsList.innerHTML) {
                    getPosts(userId);
                }
            }
        }
    };

    const getPosts = function (userId) {
        fetch(apiUrl + "posts?userId=" + userId)
            .then((posts) => {
                return posts.json();
            })
            .then((posts) => {
                let postsList = document.getElementById(userId);
                posts.forEach((post) => {
                    const newPost = document.createElement("LI");
                    newPost.innerHTML = "<span> <strong> " + post.title + " </strong> </span>" + "<br />" + "<p>" + post.body + "</p> <button class='comments_button' post-id="+ post.id+">Comments</button> <ol data-post="+post.id+"></ol>"
                    postsList.appendChild(newPost);

                    //handle the comments button click
                    let commentsBtn = document.getElementsByClassName('comments_button');
                    for (let index = 0; index < commentsBtn.length; index++) {
                        const element = commentsBtn[index];
                        element.onclick = (e) => {
                            console.log(e.target.getAttribute('post-id'))  
                            e.stopPropagation();
                        }
                    }

                    // let commentsList = document.getElementById(post.id);
                });
            })
            .catch((err) => {
                console.log("Error: " + err);
            });
    };

    window.onload = getUsers;
})();
