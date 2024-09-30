import { IsUUID } from 'class-validator';

export class KuisionerIdParamDTO {
  @IsUUID('4', { message: 'Invalid UUID format for Kuisioner ID' })
  id: string;
}
