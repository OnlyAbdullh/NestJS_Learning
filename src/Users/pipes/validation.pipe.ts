import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Metadata:', metadata);

    if (metadata.type === 'query') {
      console.log('This value came from query parameters.');
    } else if (metadata.type === 'body') {
      console.log('This value came from request body.');
    } else if (metadata.type === 'param') {
      console.log('This value came from route parameters.');
    }

    if (typeof value !== 'string') {
      throw new BadRequestException(
        'Validation failed: Value must be a stringgggggg',
      );
    }

    return value.toUpperCase();
  }
}
