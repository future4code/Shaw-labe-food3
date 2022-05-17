export const UseAuth = () => {
    const token = localStorage.getItem("token")

    const headers = {
        headers: { auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlpqZXJMOXA3UXJoUEw1VWlSS0F4IiwibmFtZSI6IkF0cm9kZXYiLCJlbWFpbCI6ImFzdHJvZGV2QGZ1dHVyZTQuY29tIiwiY3BmIjoiMTExMTMyMTU0NjU0NjUiLCJoYXNBZGRyZXNzIjp0cnVlLCJhZGRyZXNzIjoiYXNkYXNkLCBhc2Rhc2QsIGFzZGFzZCAtIGFzZGFzZCIsImlhdCI6MTY1MjcwODM2OX0.0IKccmRaip6rtG9rq8u3ZGplRCKwQutEuTvuVTjK8ws' }
    }

    return headers
}