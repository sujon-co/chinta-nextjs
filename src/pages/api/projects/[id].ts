import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import authenticated from 'server/middlewares/authenticated';
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
})
    .get(async (req, res, next) => {
        try {
            const project = await Project.findOne({ _id: req.query.id });

            return res.status(200).json({
                success: true,
                data: project,
                message: 'Project fetched successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .patch(async (req, res, next) => {
        try {
            const { body, query } = req;
            const { id: _id } = query;
            const slider = await Project.findOneAndUpdate(
                { _id },
                { ...body },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: slider,
                message: 'Project updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const { id: _id } = req.query;
            const slider = await Project.findOneAndDelete({ _id });

            res.status(200).json({
                success: true,
                data: slider,
                message: 'Project deleted successfully.',
            });
        } catch (error) {
            next(error);
        }
    });

export default connectDB(authenticated(projectHandler));
