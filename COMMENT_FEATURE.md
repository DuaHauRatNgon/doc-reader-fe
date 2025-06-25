# Tính năng Comment - Hướng dẫn sử dụng

## Tổng quan
Tính năng comment đã được hoàn thiện ở phía frontend với đầy đủ các chức năng CRUD và tương tác.

## Các API được sử dụng

### 1. Lấy danh sách comment
```
GET /api/comment/document/{docId}
Authorization: Bearer {token}
```

### 2. Tạo comment mới
```
POST /api/comment
Authorization: Bearer {token}
Body: {
  "docId": "guid",
  "content": "Nội dung bình luận"
}
```

### 3. Cập nhật comment
```
PUT /api/comment/{commentId}
Authorization: Bearer {token}
Body: {
  "content": "Nội dung mới"
}
```

### 4. Xóa comment
```
DELETE /api/comment/{commentId}
Authorization: Bearer {token}
```

### 5. Like/Unlike comment
```
POST /api/comment/{commentId}/like
Authorization: Bearer {token}
```

## Cấu trúc file

### API Service
- `src/api/commentApi.js` - Chứa tất cả các API calls cho comment

### Components
- `src/components/Comment/CommentSection.jsx` - Component chính cho tính năng comment (có thể tái sử dụng)
- `src/components/Comment/index.js` - Export file
- `src/components/BookDetail/BookComments.jsx` - Wrapper component sử dụng CommentSection

## Tính năng đã implement

### ✅ Đã hoàn thành
1. **Hiển thị danh sách comment** - Load và hiển thị tất cả comment của document
2. **Tạo comment mới** - Form để user đăng comment mới
3. **Chỉnh sửa comment** - User có thể sửa comment của mình
4. **Xóa comment** - User có thể xóa comment của mình
5. **Like comment** - User có thể like/unlike comment
6. **Authentication** - Tự động thêm token vào header, xử lý lỗi 401
7. **Loading states** - Hiển thị trạng thái loading khi thực hiện actions
8. **Error handling** - Hiển thị thông báo lỗi khi có vấn đề
9. **Responsive design** - Giao diện responsive và user-friendly
10. **Reusable component** - CommentSection có thể sử dụng ở nhiều trang

### 🎨 UI/UX Features
- **Avatar** - Hiển thị avatar với chữ cái đầu của username
- **Timestamp** - Hiển thị thời gian tạo comment theo định dạng Việt Nam
- **User info** - Hiển thị tên user đang đăng nhập
- **Action buttons** - Nút Sửa/Xóa chỉ hiển thị cho comment của user
- **Like button** - Nút like với icon trái tim và số lượng like
- **Form validation** - Validate input trước khi submit
- **Confirmation dialog** - Xác nhận trước khi xóa comment

## Cách sử dụng

### 1. Sử dụng CommentSection component
```jsx
import CommentSection from '../components/Comment/CommentSection';

// Trong component của bạn
<CommentSection 
  documentId="your-document-id" 
  title="Bình luận về tài liệu" 
/>
```

### 2. Sử dụng BookComments component (cho trang book detail)
```jsx
import BookComments from '../components/BookDetail/BookComments';

// Trong component của bạn
<BookComments bookId="your-book-id" />
```

## Trang đã tích hợp comment

1. **DocumentDetail** (`src/pages/DocumentDetail.jsx`) - Sử dụng BookComments
2. **DocumentReading** (`src/pages/DocumentReading.js`) - Sử dụng CommentSection

## Authentication

Component tự động:
- Lấy token từ localStorage
- Thêm token vào header của tất cả API calls
- Xử lý lỗi 401 (token hết hạn) bằng cách redirect về trang login
- Hiển thị thông báo yêu cầu đăng nhập nếu user chưa đăng nhập

## Error Handling

- **Network errors** - Hiển thị thông báo lỗi generic
- **Authentication errors** - Tự động redirect về login
- **Validation errors** - Validate input trước khi gửi request
- **User feedback** - Loading states và success messages

## Responsive Design

- **Mobile-friendly** - Giao diện responsive cho mobile
- **Flexible layout** - Sử dụng flexbox cho layout linh hoạt
- **Touch-friendly** - Buttons và inputs có kích thước phù hợp cho touch

## Performance

- **Lazy loading** - Chỉ load comments khi component mount
- **Optimistic updates** - Cập nhật UI ngay lập tức khi user thực hiện action
- **Error recovery** - Rollback UI nếu API call thất bại

## Tương lai có thể mở rộng

1. **Reply comments** - Cho phép reply comment
2. **Comment pagination** - Phân trang cho comment
3. **Comment sorting** - Sắp xếp comment theo thời gian, like count
4. **Comment search** - Tìm kiếm trong comment
5. **Comment moderation** - Admin có thể xóa comment của user khác
6. **Comment notifications** - Thông báo khi có comment mới
7. **Comment export** - Export comment ra file
8. **Comment analytics** - Thống kê comment

## Testing

Để test tính năng comment:

1. **Đăng nhập** vào hệ thống
2. **Vào trang document detail** hoặc **document reading**
3. **Thử các chức năng**:
   - Đăng comment mới
   - Sửa comment của mình
   - Xóa comment của mình
   - Like comment
   - Kiểm tra hiển thị comment của user khác

## Troubleshooting

### Lỗi thường gặp:
1. **"Không thể tải bình luận"** - Kiểm tra kết nối mạng và API endpoint
2. **"Token không hợp lệ"** - Đăng nhập lại
3. **"Không thể đăng bình luận"** - Kiểm tra nội dung comment và quyền user

### Debug:
- Mở Developer Tools (F12)
- Kiểm tra Console tab để xem lỗi
- Kiểm tra Network tab để xem API calls
- Kiểm tra localStorage để xem token 