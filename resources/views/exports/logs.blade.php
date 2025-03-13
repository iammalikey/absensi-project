<table>
    <thead>
        <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            {{-- <th>Clock In Location</th> --}}
            <th>Radius (km)</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($attendances as $attendance)
        <tr>
            <td>{{ $attendance->user->name }}</td>
            <td>{{ $attendance->date }}</td>
            <td>{{ $attendance->clock_in }}</td>
            <td>{{ $attendance->clock_out ?? '-' }}</td>
            {{-- <td>{{ $attendance->clock_in_lat }}, {{ $attendance->clock_in_long }}</td> --}}
            <td>{{ number_format($attendance->distance, 2) }} km</td>
            <td>{{ $attendance->status }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
