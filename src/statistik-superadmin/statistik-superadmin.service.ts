import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from 'src/common/group/gender.enum';
import { ROLES } from 'src/roles/group/role.enum';
import { RolesService } from 'src/roles/roles.service';
import { TakeKuisioner } from 'src/take-kuisioner/entities/take-kuisioner.entity';
import { UserAnswerSubKuisioner } from 'src/user-answer-sub-kuisioner/entities/user-answer-sub-kuisioner.entity';
import { Level } from 'src/user-answer-sub-kuisioner/group/level.enum';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatistikSuperadminService {
    constructor(
        @InjectRepository(TakeKuisioner)
        private readonly takeKuisionerRepository: Repository<TakeKuisioner>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @Inject(RolesService)
        private readonly rolesService: RolesService
    ) { }

    async getAllTakeKuisionerStatistik() {
        const AllDataKuisioner = await this.takeKuisionerRepository
            .createQueryBuilder('take_kuisioner')
            .leftJoinAndSelect('take_kuisioner.user', 'userEminds')
            .leftJoinAndSelect('take_kuisioner.userAnswerSubKuisioner', 'userAnswerSubKuisioner')
            .leftJoinAndSelect('userAnswerSubKuisioner.subKuisioner', 'subKuisioner')
            .leftJoinAndSelect('subKuisioner.symtompId', 'symtompId')
            .where(
                `take_kuisioner."createdAt" = (
                SELECT MAX(tk."createdAt")
                FROM take_kuisioner tk
                WHERE tk."userId" = take_kuisioner."userId"
            )`
            )
            .getMany();

        // Initialize statistics object with default values
        const statistik: Record<string, number> = {
            'Normal': 0,
            'Depresi': 0,
            'Stress': 0,
            'Kecemasan': 0,
            'Prokrastinasi': 0,
            'Kecanduan Ponsel': 0,
        };

        // console.log(AllDataKuisioner)

        // Loop through each TakeKuisioner
        AllDataKuisioner.forEach((hasilKuisionerUser: TakeKuisioner) => {
            let normalCount = 0; // Counter to track how many 'Normal' answers the user has

            // Loop through each UserAnswerSubKuisioner
            hasilKuisionerUser.userAnswerSubKuisioner.forEach((hasilUser: UserAnswerSubKuisioner) => {
                const symptomName = hasilUser.subKuisioner.symtompId.name;
                const levelName = hasilUser.level;

                if (levelName === Level.NORMAL) {
                    normalCount++;
                } else if (symptomName) {
                    if (!statistik[symptomName]) {
                        statistik[symptomName] = 1; // Initialize if it's the first occurrence
                    } else {
                        statistik[symptomName]++; // Increment for subsequent occurrences
                    }
                }
            });

            // If the user has 5 or more 'Normal' answers, increment the 'Normal' statistic
            if (normalCount >= 5) {
                statistik['Normal']++;
            }
        });

        statistik['Kecanduan'] = statistik['Kecanduan Ponsel']

        // Return the result in the desired format
        return {
            StatistikKuisioner: statistik,
        };
    }

    async getAllTakeKuisionerStatistikSymtomp() {
        const AllDataKuisioner = await this.takeKuisionerRepository
            .createQueryBuilder('take_kuisioner')
            .leftJoinAndSelect('take_kuisioner.user', 'userEminds')
            .leftJoinAndSelect('take_kuisioner.userAnswerSubKuisioner', 'userAnswerSubKuisioner')
            .leftJoinAndSelect('userAnswerSubKuisioner.subKuisioner', 'subKuisioner')
            .leftJoinAndSelect('subKuisioner.symtompId', 'symtompId')
            .where(
                `take_kuisioner."createdAt" = (
                SELECT MAX(tk."createdAt")
                FROM take_kuisioner tk
                WHERE tk."userId" = take_kuisioner."userId"
            )`
            )
            .getMany();

        // Initialize statistics object with default values
        const statistik: Record<string, { VeryLow?: number, Low: number; Intermediate: number; High: number, VeryHigh: number }[]> = {
            'Depresi': [{ Low: 0, Intermediate: 0, High: 0, VeryHigh: 0 }],
            'Stress': [{ Low: 0, Intermediate: 0, High: 0, VeryHigh: 0 }],
            'Kecemasan': [{ Low: 0, Intermediate: 0, High: 0, VeryHigh: 0 }],
            'Prokrastinasi': [{ VeryLow: 0, Low: 0, Intermediate: 0, High: 0, VeryHigh: 0 }],
            'Kecanduan Ponsel': [{ VeryLow: 0, Low: 0, Intermediate: 0, High: 0, VeryHigh: 0 }],
        };

        // Loop through each TakeKuisioner
        AllDataKuisioner.forEach((hasilKuisionerUser: TakeKuisioner) => {
            // Loop through each UserAnswerSubKuisioner
            hasilKuisionerUser.userAnswerSubKuisioner.forEach((hasilUser: UserAnswerSubKuisioner) => {
                const symptomName = hasilUser.subKuisioner.symtompId?.name;
                const levelName = hasilUser.level;

                if (symptomName) {
                    // Ensure the symptomName exists in the statistik object
                    if (!statistik[symptomName]) {
                        statistik[symptomName] = [{ VeryLow: 0, Low: 0, Intermediate: 0, High: 0, VeryHigh: 0 }];
                    }


                    if (['Depresi', 'Kecemasan', 'Stress'].includes(symptomName)) {
                        // Primary symptoms scoring
                        switch (levelName) {
                            case Level.SUPERHIGH:
                                statistik[symptomName][0].VeryHigh++;
                                break;
                            case Level.HIGH:
                                statistik[symptomName][0].High++;
                                break;
                            case Level.INTERMEDIATE:
                                statistik[symptomName][0].Intermediate++;
                                break;
                            case Level.LOW:
                                statistik[symptomName][0].Low++;
                                break;
                        }
                    } else if (['Kecanduan Ponsel', 'Prokrastinasi'].includes(symptomName)) {
                        // Secondary symptoms scoring
                        switch (levelName) {
                            case Level.SUPERHIGH:
                                statistik[symptomName][0].VeryHigh++;
                                break;
                            case Level.HIGH:
                                statistik[symptomName][0].High++;
                                break;
                            case Level.INTERMEDIATE:
                                statistik[symptomName][0].Intermediate++;
                                break;
                            case Level.LOW:
                                statistik[symptomName][0].Low++;
                                break;
                            case Level.VERYLOW:
                                statistik[symptomName][0].VeryLow++;
                                break;
                        }
                    }
                }
            });
        });

        // Set alias for 'Kecanduan Ponsel' as 'Kecanduan'
        statistik['Kecanduan'] = statistik['Kecanduan Ponsel'];

        // Return the result in the desired format
        return {
            StatistikKuisioner: statistik,
        };
    }
    async getAllUserGenderStatistik() {

        const roleUser = await this.rolesService.getRoleById(ROLES.USER)

        // Fetch users with the specific roleId
        const allUsers = await this.userRepository.find({
            where: { role: roleUser },
        });

        // Initialize the gender statistics object
        const genderStatistik: Record<string, number> = {
            'laki-laki': 0,
            'perempuan': 0,
        };

        // Iterate through users and count genders
        allUsers.forEach(user => {
            if (user.gender === Gender.LakiLaki) {
                genderStatistik['laki-laki']++;
            } else if (user.gender === Gender.Perempuan) {
                genderStatistik['perempuan']++;
            }
        });

        // Return the gender statistics
        return {
            StatistikGender: genderStatistik,
        };
    }


    async getAllUserKuisionerStatistik() {
        const AllDataKuisioner = await this.takeKuisionerRepository
            .createQueryBuilder('take_kuisioner')
            .leftJoinAndSelect('take_kuisioner.user', 'userEminds')
            .leftJoinAndSelect('take_kuisioner.userAnswerSubKuisioner', 'userAnswerSubKuisioner')
            .leftJoinAndSelect('userAnswerSubKuisioner.subKuisioner', 'subKuisioner')
            .leftJoinAndSelect('take_kuisioner.kuisioner', 'kuisoner')
            .leftJoinAndSelect('subKuisioner.symtompId', 'symtompId')
            .where(
                `take_kuisioner."createdAt" = (
                    SELECT MAX(tk."createdAt")
                    FROM take_kuisioner tk
                    WHERE tk."userId" = take_kuisioner."userId"
                )`
            )
            .getMany();

        // Initialize user symptom data
        const userSymptomData = AllDataKuisioner.map((takeKuisioner) => {
            const symptomScores: Record<string, number> = {
                'Depresi': 0,
                'Kecemasan': 0,
                'Stress': 0,
                'Prokrastinasi': 0,
                'Kecanduan Ponsel': 0,
            };

            // Calculate points for each symptom based on hierarchy and level
            takeKuisioner.userAnswerSubKuisioner.forEach((answer) => {
                const symptomName = answer.subKuisioner.symtompId?.name;
                if (symptomName) {
                    let score = 0;

                    // Apply scoring based on symptom hierarchy and level
                    if (['Depresi', 'Kecemasan', 'Stress'].includes(symptomName)) {
                        // Primary symptoms scoring
                        switch (answer.level) {
                            case Level.SUPERHIGH:
                                score = 1.25
                                break;
                            case Level.HIGH:
                                score = 1;
                                break;
                            case Level.INTERMEDIATE:
                                score = 0.75;
                                break;
                            case Level.LOW:
                                score = 0.5;
                                break;
                            case Level.VERYLOW:
                                score = 0.25
                                break;
                        }
                    } else if (['Kecanduan Ponsel', 'Prokrastinasi'].includes(symptomName)) {
                        // Secondary symptoms scoring
                        switch (answer.level) {
                            case Level.SUPERHIGH:
                                score = 1
                                break;
                            case Level.HIGH:
                                score = 0.75;
                                break;
                            case Level.INTERMEDIATE:
                                score = 0.5;
                                break;
                            case Level.LOW:
                                score = 0.25;
                                break;
                            case Level.VERYLOW:
                                score = 0.1;
                                break;
                        }
                    }
                    symptomScores[symptomName] += score;
                }
            });

            // Filter out symptoms with a score of zero
            const filteredSymptomScores = Object.fromEntries(
                Object.entries(symptomScores).filter(([_, score]) => score > 0)
            );

            return {
                takeKuisionerId: takeKuisioner.id,
                userId: takeKuisioner.user.id,
                kuisionerId: takeKuisioner.kuisioner.id,
                kuisionerName: takeKuisioner.kuisioner.title,
                userName: takeKuisioner.user.username,
                symptomScores: filteredSymptomScores,
                totalScore: Object.values(filteredSymptomScores).reduce((acc, score) => acc + score, 0),
            };
        });

        // Sort users by total score (descending)
        const sortedUserSymptomData = userSymptomData.sort((a, b) => b.totalScore - a.totalScore);

        // Return the sorted data with user name and symptom scores
        return {
            UserSymptomStatistics: sortedUserSymptomData.map((user) => ({
                takeKuisionerId: user.takeKuisionerId,
                userId: user.userId,
                kuisionerId: user.kuisionerId,
                kuisionerName: user.kuisionerName,
                userName: user.userName,
                symptoms: user.symptomScores,
            })),
        };
    }



}
