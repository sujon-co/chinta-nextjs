import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import Project from 'server/models/Project';

const projectHandler = nextConnect<NextApiRequest, NextApiResponse>({
    onError: (err, req, res, next) => {
        if (err.message) {
            res.status(err.status || 500).json({
                status: false,
                data: null,
                message: err.message,
            });
        } else {
            res.status(500).json({
                success: false,
                data: null,
                message: 'There was an error',
            });
        }
    },
    onNoMatch: (req, res) => {
        res.status(405).json({
            success: false,
            data: null,
            message: `Method ${req.method} Not Allowed! `,
        });
    },
}).get(async (req, res, next) => {
    try {
        console.log(req.query);
        // @ts-ignore
        const projects = await Project.find({
            $text: { $search: req.query.query },
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: Array.isArray(projects) ? projects : [],
            message: 'Project fetched successfully.',
        });
    } catch (error) {
        next(error);
    }
});

export default connectDB(projectHandler);
