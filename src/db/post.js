const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: new Schema({
            name: {
                type: String,
                required: true,
                trim: true,
            },
            email: {
                type: String,
                required: true,
                trim: true,
            }
        }),
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    resourceUrl: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
    upVotes: {
        type: Number,
        default: 0,
    },
    downVotes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    tags: [String],
});

function createPost(post, user) {
    const { title, resourceUrl, description, tags } = post;
    const { _id, name, email } = user;

    const newPost = new Post({
        user: {
            _id,
            name,
            email,
        },
        title,
        resourceUrl,
        description,
        tags,
    });

    return newPost.save();
}

schema.statics.create = createPost;

const Post = mongoose.model('posts', schema);

module.exports = Post;
