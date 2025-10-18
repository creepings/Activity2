"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notes_service_1 = require("./notes.service");
const create_note_dto_1 = require("./dto/create-note.dto");
const update_note_dto_1 = require("./dto/update-note.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let NotesController = class NotesController {
    notesService;
    constructor(notesService) {
        this.notesService = notesService;
    }
    create(createNoteDto, req) {
        return this.notesService.create(createNoteDto, req.user.userId);
    }
    findAll(req) {
        return this.notesService.findAllByUser(req.user.userId);
    }
    findOne(id, req) {
        return this.notesService.findOne(+id, req.user.userId);
    }
    update(id, updateNoteDto, req) {
        return this.notesService.update(+id, updateNoteDto, req.user.userId);
    }
    remove(id, req) {
        return this.notesService.remove(+id, req.user.userId);
    }
};
exports.NotesController = NotesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new note' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Note created successfully' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all notes for current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all user notes' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific note' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the note' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Note not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a note' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Note updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Note not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_note_dto_1.UpdateNoteDto, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a note' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Note deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Note not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "remove", null);
exports.NotesController = NotesController = __decorate([
    (0, swagger_1.ApiTags)('Notes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('notes'),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesController);
//# sourceMappingURL=notes.controller.js.map