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
            enum: ['residential', 'commercial', 'publicSpace', 'urbanism'],
        },
        status: {
            type: String,
            required: true,
            enum: ['idea', 'inProgress', 'underConstruction', 'completed'],
        },
        principalArchitect: {
            type: String,
            required: true,
        },
        designTeam: {
            type: String,
            required: true,
        },
        landscape: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        engineer: {
            type: String,
            required: true,
        },
        taskConstructionFirm: {
            type: String,
            required: true,
        },
        photograph: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        topImage: {
            type: String,
            required: true,
        },
        portraitImage: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

projectSchema.index({ name: 'text', year: 'text', principalArchitect: 'text' });

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
