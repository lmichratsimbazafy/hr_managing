import { DataSource } from 'typeorm';
import { Status } from '../entities/status.entity';
import { StatusDTO } from '../status/dto/status.dto';
import { StatusService } from '../status/status.service';
import { UserDTO } from '../users/dto/user.dto';

export const seedStatus = (
  connection: DataSource,
  user: UserDTO,
): Promise<void> => {
  const statusService = new StatusService(
    connection.manager.getRepository(Status),
  );
  console.log('seeding status');
  const statusList: StatusDTO[] = [
    { displayText: 'En mission', label: 'ON_MISSION' },
    { displayText: 'Intercontrat', label: 'INTERCONTRACT' },
    { displayText: 'Arrivage', label: 'ARRIVAL' },
    { displayText: 'Autres', label: 'OTHER' },
  ].map((e) => StatusDTO.from(e));

  Promise.all(
    statusList.map((e) => statusService.create({ statusDTO: e, user: user })),
  ).then(() => {
    console.log('Status seed successful 👌');
  });

  return;
};
