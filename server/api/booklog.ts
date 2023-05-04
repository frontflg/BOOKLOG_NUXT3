import { PrismaClient, Prisma } from '@prisma/client';
import { sendError } from 'h3';

export default defineEventHandler(async (e) => {
  const prisma = new PrismaClient();
  const method = e.req.method;

  if (method === 'GET') {
    // console.log(method);
    const booklog = await prisma.booklog.findMany({
      orderBy: { issuedate: 'desc' },
    });

    return booklog;
  }

  if (method === 'POST') {
    const body = await readBody(e);
    console.log('post', body);
    if (!body) {
      const detailError = createError({
        statusCode: 400,
        statusMessage: 'No item provided',
        data: {},
      });
      sendError(e, detailError);
    }

    let temp = {};
    try {
      if (body.mode === 'find') {
        temp = await prisma.booklog.findUnique({
          where: { isbn13: body.isbn13 },
        });
      }
      if (body.mode === 'create') {
        temp = await prisma.booklog.create({
          data: body.data,
        });
      }
    } catch (error) {
      console.log(error);
    }

    return temp;
  }

  if (method === 'PUT') {
    console.log('update');
    const body = await readBody(e);
    if (!body) {
      const detailError = createError({
        statusCode: 400,
        statusMessage: 'No item provided',
        data: {},
      });

      sendError(e, detailError);
    }

    let temp = {};
    if (body.mode === 'update') {
      temp = await prisma.booklog.update({
        where: { isbn13: body.targetId },
        data: body.data,
      });
    }
    return temp;
  }

  if (method === 'DELETE') {
    console.log('delete');
    const body = await readBody(e);
    if (!body) {
      const detailError = createError({
        statusCode: 400,
        statusMessage: 'No item provided',
        data: {},
      });

      sendError(e, detailError);
    }
    let temp = {};
    if (body.mode === 'delete') {
      temp = await prisma.booklog.delete({
        where: { isbn13: body.targetId },
      });
    }

    return temp;
  }
});
