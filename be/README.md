### PostApi

Ví dụ muốn lưu bài post sau:
>Mình đang học **JS Cơ bản**, hãy giúp mình giải thích đoạn code này được không:
>```js
>for (int i=0; i<n; i++)
>  console.log(i);
>```
#### Request:
```bash
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'token': 'Bearer your_jwt_token_here'
  },
  body: JSON.stringify({
    "title": "Welcome to the Community!",
    "type": "announcement",
    "content": "<p>Welcome to our community!</p>",
    "tags": [
      "Community",
      "Introduction"
    ],
    "reason": null
  })
```


```js
{
  "title": "Welcome to the Community!",
  "type": "announcement",
  "content": "<p>Welcome to our community!</p>",
  "tags": [
    "Community",
    "Introduction"
  ],
  "reason": null
}
```


### API Comment
```bash
{
  "post_id": "6569e7b4cc179cbd35515f93",
  "comment_id": "658c3b8d1796cc08f59bb438",
  "content": "sửa bình luận mới bằng api",
  "reating": []
}
```