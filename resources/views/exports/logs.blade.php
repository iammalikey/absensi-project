<table>
    <thead>
        <tr>
            <th>Employee Name</th>
            <th>Total Attendance ({{ $month }})</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($logs as $log)
            <tr>
                <td>{{ $log->name }}</td>
                <td>{{ $log->attendances_count }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
