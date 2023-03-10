import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications.repository';
import { CancelNotification } from '../use-cases/cancel-notifications';
import { NotFoundError } from '../errors';
import { makeNotification } from '../../../../../test/factories/notification-factory';

describe('Tests for cancel notifications', () => {
  it('should cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

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
    ).rejects.toThrow(NotFoundError);
  });
});
