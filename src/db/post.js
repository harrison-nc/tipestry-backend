const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
            required: true,
                trim: true,
    },
    createdAt: {
        type: Date,
            default: Date.now(),
    },
    user: {
        type: new Schema({
            name: {
                type: String,
                default: 'annon',
                trim: true,
            },
            email: {
                type: String,
                default: 'annon@mail.com',
                trim: true,
            }
        }),
        required: true,
    }
});

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
    comments: [commentSchema],
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

schema.methods.addComment = async function(comment) {
    let user = {};

    if (comment.user) user = comment.user;

    const { text } = comment;

    let _id = new ObjectId();

    const newComment = { _id, text, user };

    this.comments.push(newComment);

    await this.save();

    return newComment;
}

const Post = mongoose.model('posts', schema);

module.exports = Post;
