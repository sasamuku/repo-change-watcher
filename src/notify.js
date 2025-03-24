const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send notification email with important PRs
 * @param {Array} importantPRs - List of important PRs to notify
 * @returns {Promise} SendGrid response
 */
async function sendNotification(importantPRs) {
  // Build email content
  let emailContent = '<h1>Important PR Notification</h1>';
  emailContent += '<p>List of important PRs merged yesterday:</p>';
  emailContent += '<ul>';

  for (const pr of importantPRs) {
    emailContent += `
      <li>
        <strong>${pr.repo}</strong> -
        <a href="${pr.url}">PR #${pr.number}: ${pr.title}</a>
        (by ${pr.author})
      </li>
    `;
  }

  emailContent += '</ul>';

  // Prepare email
  const msg = {
    to: process.env.NOTIFY_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: 'Repo Change Watcher - Important PR Notification',
    html: emailContent,
  };

  // Send email
  return sgMail.send(msg);
}

module.exports = { sendNotification };
