import { auth } from '$lib/firebase';
import type { Handle } from '@sveltejs/kit';
import * as amp from '@sveltejs/amp';
import dropcss from 'dropcss';

export const handle: Handle = async ({ event, resolve }) => {
  // Get the current user from Firebase Auth
  const user = await auth.currentUser;

  // Add the user to the locals object for global access
  event.locals.user = user;
  let buffer = '';
  return await resolve(event, {
    transformPageChunk: ({ html, done }) => {
      buffer += html;

      if (done) {
        let css = '';
        const markup = amp
          .transform(buffer)
          .replace('⚡', 'amp') // dropcss can't handle this character
          .replace(/<style amp-custom([^>]*?)>([^]+?)<\/style>/, (match, attributes, contents) => {
            css = contents;
            return `<style amp-custom${attributes}></style>`;
          });

        css = dropcss({ css, html: markup }).css;
        return markup.replace('</style>', `${css}</style>`);
      }
    }
  });
};
