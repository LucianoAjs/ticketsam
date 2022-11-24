import { CreatePreferenceDto } from '@/modules/user-buyer/dto/create-preference.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as MercadoPago from 'mercadopago';
import { DefaultConfigurationOmitQs } from 'mercadopago/models/default-configuration.model';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import {
  ExecOptions,
  MercadoPagoResponse,
} from 'mercadopago/utils/mercadopago-respose';

export type PreferenceCreateResponse = MercadoPagoResponse<
  ExecOptions<DefaultConfigurationOmitQs, CreatePreferencePayload>
>;

@Injectable()
export class MercadoPagoAdapterService {
  constructor(protected readonly configService: ConfigService) {
    MercadoPago.configure({
      access_token: configService.get('MERCADO_PAGO_ACCESS_TOKEN'),
    });
  }

  async createPreference(
    ticketId: string,
    createPreferenceDto: CreatePreferenceDto,
  ): Promise<PreferenceCreateResponse> {
    const { quantity, title, unit_price } = createPreferenceDto;

    const preference: CreatePreferencePayload = {
      items: [
        {
          title,
          unit_price,
          quantity,
        },
      ],
      back_urls: {
        success: this.configService.get('MERCADO_PAGO_CALL_BACK_URL_SUCCESS'),
        failure: this.configService.get('MERCADO_PAGO_CALL_BACK_URL_FAILURE'),
        pending: this.configService.get('MERCADO_PAGO_CALL_BACK_URL_PENDING'),
      },
      auto_return: 'approved',
      external_reference: ticketId,
      notification_url: this.configService.get(
        'MERCADO_PAGO_WEBHOOK_PAYMENT_NOTIFICATION_URL',
      ),
    };

    const response = await MercadoPago.preferences.create(preference);

    return response;
  }
}
