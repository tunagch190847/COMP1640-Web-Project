import { Comment } from '@core/database/mysql/entity/comment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async getCommentsByParent(
        parent_id?: number, 
        entityManager?: EntityManager
    ) {
        const commentRepository = entityManager
            ? entityManager.getRepository<Comment>('comment')
            : this.commentRepository;

        
    }
}
