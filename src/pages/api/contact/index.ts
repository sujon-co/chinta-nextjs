import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import connectDB from 'server/database';
import Contact from 'server/models/Contact';

const contactHandler = nextConnect<NextApiRequest, NextApiResponse>({
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
            const contact = await Contact.find({}).sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                data: contact,
                message: 'Contact fetched successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { body } = req;
            const contact = await Contact.create(body);

            res.status(200).json({
                success: true,
                data: contact,
                message: 'Contact uploaded successfully.',
            });
        } catch (error) {
            next(error);
        }
    })
    .patch(async (req, res, next) => {
        try {
            const { body } = req;
            console.log({ body });

            const contact = await Contact.findByIdAndUpdate(
                body._id,
                { ...body },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: contact,
                message: 'Contact updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    });
export default connectDB(contactHandler);
