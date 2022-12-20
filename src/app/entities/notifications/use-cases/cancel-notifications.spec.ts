import { Notification } from '../notifications';
import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications.repository';
import { Content } from '../content';
import { CancelNotification } from './cancel-notifications';
import { NotificationNotFound } from '../errors/notification-not-found.error';

describe('Tests for cancel notifications', () => {
  it('should cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      content: new Content('notification content aaa'),
      category: 'notification test category',
      recipientId: 'fake recipient id',
    });

    notificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(
      async () =>
        await cancelNotification.execute({
          notificationId: 'non existing notification id',
        }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
