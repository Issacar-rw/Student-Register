// src/st-registion-backend/main.mo
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Result "mo:base/Result";

actor Student {
    // Student type definition
    public type StudentData = {
        studentId: Text;
        name: Text;
        email: Text;
        course: Text;
        year: Text;
    };

    private var students = HashMap.HashMap<Text, StudentData>(0, Text.equal, Text.hash);

    // Create a new student
    public shared func registerStudent(student: StudentData) : async Result.Result<(), Text> {
        switch (students.get(student.studentId)) {
            case (?existing) {
                #err("Student with ID " # student.studentId # " already exists");
            };
            case null {
                students.put(student.studentId, student);
                #ok();
            };
        };
    };

    // Get all students
    public query func getAllStudents() : async [StudentData] {
        Iter.toArray(students.vals());
    };

    // Get a specific student
    public query func getStudent(studentId: Text) : async ?StudentData {
        students.get(studentId);
    };

    // Update student information
    public shared func updateStudent(student: StudentData) : async Result.Result<(), Text> {
    switch (students.get(student.studentId)) {
        case (?existing) {
            students.put(student.studentId, student);
            #ok();
        };
        case null {
            // Return a more descriptive error message.
            #err("Student with ID " # student.studentId # " not found.");
        };
    };
};



    // Delete a student
    public shared func deleteStudent(studentId: Text) : async Result.Result<(), Text> {
        switch (students.get(studentId)) {
            case (?existing) {
                ignore students.remove(studentId);
                #ok();
            };
            case null {
                #err("Student not found");
            };
        };
    };
}