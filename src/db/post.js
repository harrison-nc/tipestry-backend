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
    }
});

const schema = new Schema({
    user: {
        type: new Schema({
            name: {
                type: String,
                trim: true,
                default: 'annonymous'
            },
            email: {
                type: String,
                default: 'annonymous@mail.com',
                trim: true,
            },
            avatarUrl: {
                type: String,
                default: 'https://picsum.photos/50',
            }
        }),
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

    const dbPost = {
        title,
        resourceUrl,
        description
    };

    if (user) {
        const { _id, name, email } = user;
        dbPost.user = {
            _id,
            name,
            email,
        };
    }

    else dbPost.user = {};

    if (tags) dbPost.tags = tags;

    else dbPost.tags = [];

    return new Post(dbPost).save();
}

schema.statics.create = createPost;

schema.methods.addComment = async function (comment) {
    let { text, user } = comment;

    if (!user) user = {};

    const _id = new ObjectId();
    const newComment = { _id, text, user };

    this.comments.push(newComment);

    await this.save();

    return newComment;
}

const Post = mongoose.model('posts', schema);

module.exports = Post;
