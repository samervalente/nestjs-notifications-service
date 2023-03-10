import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors';
import { NotificationsRepository } from '../notifications.repository';
interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationsRepository.findByID(
      notificationId,
    );
    if (!notification) {
      throw new NotFoundError('Notification not found');
    }

    notification.cancel();
    await this.notificationsRepository.update(notification);
  }
}
