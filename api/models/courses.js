var mongoose = require( 'mongoose' );

// Course collection schema
var courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    code:{
        type: String,
        unique: true
    },
    //owner:mongoose.Schema.Types.ObjectId,
    owner:{
        type: String,
        required: true
    },
    users:{
        //type: [mongoose.Schema.Types.ObjectId],
        type:[String],
        default: []
    },
    forums:[{
                sender: mongoose.Schema.Types.ObjectId,
                msg : String
            }]
});
    
mongoose.model('Course', courseSchema,'courses');