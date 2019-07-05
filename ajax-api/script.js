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
                    li.innerHTML = "Name : <span>" + user.name + " </span> <br /> Email: <span>" + user.email + "</span> <br /> <button class='posts_button' user-id=" + user.id + "> Show posts </button> <ol class='posts_list' id=" + user.id + "></ol>";
                    usersElements.appendChild(li);
                });
            })
            .then(() => {
                let postsBtns = document.getElementsByClassName('posts_button');
                listenPostsButtonsClick(postsBtns);
            })
            .catch((err) => {
                console.log("Error: " + err);
            });
    }

    const getPosts = function (userId) {
        fetch(apiUrl + "posts?userId=" + userId)
            .then((posts) => {
                return posts.json();
            })
            .then((posts) => {
                let postsList = document.getElementById(userId);
                posts.forEach((post) => {
                    const newPost = document.createElement("LI");
                    newPost.innerHTML = "<span> <strong> " + post.title + " </strong> </span>" + "<br />" + "<p>" + post.body + "</p> <button class='comments_button' post-id=" + post.id + "> + Comments</button> <ol class='comments_list' data-post=" + post.id + "></ol>"
                    postsList.appendChild(newPost);
                });
            })
            .then(() => {
                let commentsBtn = document.getElementsByClassName('comments_button');
                listenCommentsButtonsClick(commentsBtn);
            })
            .catch((err) => {
                console.log("Error: " + err);
            });
    };

    const getComments = function (postId) {

        let commentsList = document.querySelectorAll('[data-post="' + postId + '"]')[0];

        fetch(apiUrl + 'comments?postId=' + postId)
            .then((resp) => {
                return resp.json();
            })
            .then((comments) => {
                comments.forEach((comment) => {
                    let newComment = document.createElement("LI");
                    newComment.innerHTML = "<span> <strong> " + comment.email + " </strong> </span>" + "<br />" + "<p>" + comment.body + " </p>";
                    commentsList.appendChild(newComment);
                });
            })
            .catch((err) => {
                console.log("Error: " + err);
            });
    };

    const listenPostsButtonsClick = function (postsBtns) {

        for (let index = 0; index < postsBtns.length; index++) {
            const element = postsBtns[index];
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

    const listenCommentsButtonsClick = function (commentsBtn) {
        for (let index = 0; index < commentsBtn.length; index++) {
            const element = commentsBtn[index];
            element.onclick = (e) => {
                e.stopPropagation();
                let postId = e.target.getAttribute('post-id');
                let commentsList = document.querySelectorAll('[data-post="' + postId + '"]')[0];
                commentsList.classList.toggle('active');

                if (commentsList.classList.contains('active')) {
                    element.innerHTML = "- Comments"
                } else {
                    element.innerHTML = "+ Comments"
                }
                if (!commentsList.innerHTML) {
                    getComments(postId);
                }
            }
        }
    };

    window.onload = getUsers;
})();
