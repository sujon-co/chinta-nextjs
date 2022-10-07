import { model, models, Schema } from 'mongoose';
import { IProject } from 'server/interface';

const projectSchema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['residential', 'commercial', 'public space', 'urbanism', 'interior'],
        },
        status: {
            type: String,
            required: true,
            enum: ['idea', 'in progress', 'under construction', 'completed'],
        },
        principalArchitect: {
            type: String,
            required: true,
        },
        designTeam: String,
        landscape: String,

        size: String,
        engineer: String,
        taskConstructionFirm: String,
        photograph: String,
        video: String,
        year: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        topImage: {
            type: Number,
            required: true,
        },
        portraitImage: {
            type: Number,
            required: true,
        },
        images: String,
        slug: String,
        gallery: [String],
    },
    { timestamps: true }
);

projectSchema.index({
    name: 'text',
    principalArchitect: 'text',
    designTeam: 'text',
    engineer: 'text',
});

const Project = models.Project || model<IProject>('Project', projectSchema);
export default Project;

// map: {
//     required: false,
//     getLocation: {
//         lat: {
//             type: String,
//         },
//         lng: {
//             type: String,
//         },
//     },
//     locationName: {
//         type: String,
//     },
//     zoomLevel: {
//         type: Number,
//     },
//     streetButton: {
//         type: String,
//     },
//     showMaker: {
//         type: Boolean,
//     },
// },
